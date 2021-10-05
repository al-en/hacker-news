import { Schema } from 'mongoose'

export const ArticleSchema = new Schema({
    title: String,
    story_title: String,
    author: String,
    created_at: Date,
    url: String,
    story_url: String
});