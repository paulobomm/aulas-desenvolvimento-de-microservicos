export interface PaginationMeta {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

export interface PaginationLinks {
  self: {
    href: string;
    method: string;
  };
  next?: {
    href: string;
    method: string;
  };
  prev?: {
    href: string;
    method: string;
  };
  first: {
    href: string;
    method: string;
  };
  last: {
    href: string;
    method: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
  _links: PaginationLinks;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export class PaginatedResponseBuilder<T> {
  constructor(
    private data: T[],
    private totalItems: number,
    private page: number,
    private limit: number,
    private basePath: string,
  ) {}

  build(): PaginatedResponse<T> {
    const totalPages = Math.ceil(this.totalItems / this.limit);

    const buildUrl = (page: number) =>
      `${this.basePath}?_page=${page}&_size=${this.limit}`;

    return {
      data: this.data,
      meta: {
        totalItems: this.totalItems,
        itemsPerPage: this.limit,
        currentPage: this.page,
        totalPages,
      },
      _links: {
        self: {
          href: buildUrl(this.page),
          method: "GET",
        },
        ...(this.page > 1 && {
          prev: {
            href: buildUrl(this.page - 1),
            method: "GET",
          },
        }),
        ...(this.page < totalPages && {
          next: {
            href: buildUrl(this.page + 1),
            method: "GET",
          },
        }),
        first: {
          href: buildUrl(1),
          method: "GET",
        },
        last: {
          href: buildUrl(totalPages),
          method: "GET",
        },
      },
    };
  }
}
