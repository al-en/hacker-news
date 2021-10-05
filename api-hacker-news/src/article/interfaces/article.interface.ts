import { Document } from "mongoose";

export interface Article extends Document{
    readonly title: String,
    readonly story_title: String,
    readonly author: String,
    readonly created_at: Date
    readonly url: String,
    readonly story_url: String
}