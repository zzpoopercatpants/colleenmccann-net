import { createClient, type SanityClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client: SanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2025-01-01',
  // The webhook rebuilds within seconds of a publish, faster than Sanity's
  // CDN cache reliably catches up -- useCdn:true risks a build seeing stale
  // (pre-publish) data. This is a build-time-only client (SSG), so the
  // small latency/cost of hitting the live API instead is negligible.
  useCdn: false,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export interface ResearchEntry {
  _id: string;
  title: string;
  slug: string;
  publishDate: string;
  abstract: string;
  topics: string[];
  hostingType: 'onsite' | 'external';
  body?: any[];
  pdfFile?: { url: string };
  externalUrl?: string;
  externalSourceName?: string;
}

export interface InsightEntry {
  _id: string;
  title: string;
  slug: string;
  publishDate: string;
  summary: string;
  topics: string[];
  format: 'article' | 'video' | 'audio';
  body?: any[];
  mediaUrl?: string;
  duration?: string;
}

export interface MediaEntry {
  _id: string;
  title: string;
  type: string;
  date: string;
  host: string;
  linkUrl?: string;
  linkLabel?: string;
}

export interface AboutDoc {
  name: string;
  headshot: { asset: { _ref: string }; alt: string };
  bio: any[];
}

export interface ContactDoc {
  blurb: string;
  email: string;
  linkedinUrl: string;
}

const researchProjection = `{
  _id, title, "slug": slug.current, publishDate, abstract, topics, hostingType,
  body, "pdfFile": pdfFile.asset->{url}, externalUrl, externalSourceName
}`;

const insightsProjection = `{
  _id, title, "slug": slug.current, publishDate, summary, topics, format,
  body, mediaUrl, duration
}`;

const mediaProjection = `{
  _id, title, type, date, host, linkUrl, linkLabel
}`;

export async function getAllResearch(): Promise<ResearchEntry[]> {
  return client.fetch(`*[_type == "research"] | order(publishDate desc) ${researchProjection}`);
}

export async function getResearchBySlug(slug: string): Promise<ResearchEntry | null> {
  return client.fetch(
    `*[_type == "research" && slug.current == $slug][0] ${researchProjection}`,
    { slug }
  );
}

export async function getAllInsights(): Promise<InsightEntry[]> {
  return client.fetch(`*[_type == "insights"] | order(publishDate desc) ${insightsProjection}`);
}

export async function getInsightBySlug(slug: string): Promise<InsightEntry | null> {
  return client.fetch(
    `*[_type == "insights" && slug.current == $slug][0] ${insightsProjection}`,
    { slug }
  );
}

export async function getAllMedia(): Promise<MediaEntry[]> {
  return client.fetch(`*[_type == "media"] | order(date desc) ${mediaProjection}`);
}

export async function getAbout(): Promise<AboutDoc | null> {
  return client.fetch(`*[_type == "about"][0]{ name, headshot{asset->{_ref, url}, alt}, bio }`);
}

export async function getContact(): Promise<ContactDoc | null> {
  return client.fetch(`*[_type == "contact"][0]{ blurb, email, linkedinUrl }`);
}
