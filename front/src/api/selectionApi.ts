import apiClient from "./apiClient";

export interface SelectionResponse {
    id: number;
    name : string;
    gender: string;
    profileImg?: string; 
    major: string;
    hobby: string;
    dream: string;  
}

export const getAllSelections = async () :Promise<SelectionResponse[]> => {
    const response = await apiClient.get('/selection');
    return response.data;
}