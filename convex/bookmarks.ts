import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("bookmarks").collect();
  },
});

export const addBookmark = mutation({
  args: {
    title: v.string(),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("bookmarks", {
      title: args.title,
      url: args.url,
    });
  },
});

export const deleteBookmark = mutation({
  args: { id: v.id("bookmarks") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
