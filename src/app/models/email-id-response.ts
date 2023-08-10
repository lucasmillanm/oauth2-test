export interface EmailIdResponse {
  messages: { id: string; threadId: string }[];
  nextPageToken: string;
  resultSizeEstimate: number;
}
