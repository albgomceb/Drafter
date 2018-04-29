import { Meeting } from "./meeting.model";

export class MeetingPagination {
    beans: Array<Meeting>;
    numberOfPage: number;
    totalPages : number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;    
}