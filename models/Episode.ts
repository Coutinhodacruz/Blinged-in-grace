import mongoose, { Schema, Document } from 'mongoose';

export interface IEpisode extends Document {
    title: string;
    description: string;
    duration?: string;
    date: string;
    category?: string;
    available: boolean;
    audioSrc?: string;
    badge?: string;
    image: string;
    youtubeEmbed?: string;
    spotifyEmbed?: string;
}

const EpisodeSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        duration: { type: String },
        date: { type: String, required: true },
        category: { type: String },
        available: { type: Boolean, default: true },
        audioSrc: { type: String },
        badge: { type: String },
        image: { type: String, required: true },
        youtubeEmbed: { type: String },
        spotifyEmbed: { type: String },
    },
    { timestamps: true }
);

export default mongoose.models.Episode || mongoose.model<IEpisode>('Episode', EpisodeSchema);
