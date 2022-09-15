import { PaginationMetadata } from "../../response";

export type PaginatedResponse<T> = {
  metadata: PaginationMetadata;
  items: T[];
};
