import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  bookmarks: defineTable({
    title: v.string(),
    url: v.string(),
    userId: v.string()
  }),
});
