// pages/api/submitBookmark.ts

import type { NextApiRequest, NextApiResponse } from 'next'

// Define the expected structure of the request body
type BookmarkData = {
  url: string;
  selectedText: string;
}

// Define the structure of the response data
type ResponseData = {
  status: string;
  message: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    // Assuming the request body will be of type BookmarkData
    const { url, selectedText }: BookmarkData = req.body;
    
    console.log('Received URL:', url);
    console.log('Selected Text:', selectedText);
    
    // Here you would typically save the bookmark data to your database
    
    res.status(200).json({ status: 'Success', message: 'Bookmark received' });
  } else {
    // If the request method is not POST, return a 405 Method Not Allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ status: 'Error', message: `Method ${req.method} Not Allowed` });
  }
}
