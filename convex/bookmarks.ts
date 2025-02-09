import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not Authenticated");
    }
    return await ctx.db
      .query("bookmarks")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();
  },
});

export const addBookmark = mutation({
  args: {
    title: v.string(),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log(identity);
    if (identity === null) {
      throw new Error("Not Authenticated");
    }
    console.log("Adding bookmark to", identity.email);
    await ctx.db.insert("bookmarks", {
      title: args.title,
      url: args.url,
      userId: identity.subject,
    });
  },
});

export const deleteBookmark = mutation({
  args: { id: v.id("bookmarks") }, // Ensure correct ID type
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authenticated");
    }

    // ✅ Fetch the bookmark BEFORE deleting
    const bookmark = (await ctx.db.get(id)) as Doc<"bookmarks"> | undefined;

    if (bookmark === undefined) {
      throw new Error("Bookmark not found");
    }

    if (bookmark.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    // ✅ Now delete the bookmark
    await ctx.db.delete(id);
  },
});
