import { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = 'https://yourdomain.com'; // Replace with your actual domain

const staticPages = [
    '',
    // Add more static routes as needed
];

function generateSitemap() {
    const urls = staticPages
        .map(
            (page) => `
        <url>
            <loc>${BASE_URL}${page}</loc>
            <changefreq>weekly</changefreq>
            <priority>1</priority>
        </url>`
        )
        .join('');

    return [`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls}
    </urlset>`,
        {
      url: "https://syaperfume.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://syaperfume.com/knight",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://syaperfume.com/coldmark",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://syaperfume.com/glow",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://syaperfume.com/blushe",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
];
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Content-Type', 'application/xml');
    res.write(generateSitemap());
    res.end();
}