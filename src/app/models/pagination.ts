import { PaginationItem } from "./paginationItem";

export class Pagination {
    private first: string;
    private prev: string;
    private self: string;
    private next: string;
    last: string;

    constructor(pagination: Pagination) {
        this.first = pagination.first;
        this.prev = pagination.prev;
        this.self = pagination.self;
        this.next = pagination.next;
        this.last = pagination.last;
    }

    private getPageNumber(link) : number {
        const url = new URL(link);
        let page: number = parseInt(url.searchParams.get("page"));
        return ++page;
    }

    isCurrentPage(name: string) : boolean {
        return this[name] === this.self;
    }

    getSortedItems(): Array<PaginationItem> {
        let pagination: Array<PaginationItem> = [];

        if (this.first != this.prev) {
            pagination.push({
                pageNumber: this.getPageNumber(this.first),
                link: this.first,
                disabled: false
            });
        }

        if (this.prev != this.self) {
            pagination.push({
                pageNumber: this.getPageNumber(this.prev),
                link: this.prev,
                disabled: false
            });
        }

        pagination.push({
            pageNumber: this.getPageNumber(this.self),
            link: this.self,
            disabled: true
        });

        if (this.next != this.self) {
            pagination.push({
                pageNumber: this.getPageNumber(this.next),
                link: this.next,
                disabled: false
            });
        }
        
        if (this.last != this.next) {
            pagination.push({
                pageNumber: this.getPageNumber(this.last),
                link: this.last,
                disabled: false
            });
        }

        return pagination;
    }
}