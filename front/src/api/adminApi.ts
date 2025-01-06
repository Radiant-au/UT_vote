import apiClient from "./apiClient";

export interface VoteCountDto {
    selectionId: number;
    selectionName: string;
    voteCount: number;
}

export interface VoteCountsResponseDto {
    maleVotes: VoteCountDto[];
    femaleVotes: VoteCountDto[];
}

export const CodeLogin = async () :Promise<VoteCountsResponseDto> => {
    const response = await apiClient.get('/');
    return response.data;
  };
  