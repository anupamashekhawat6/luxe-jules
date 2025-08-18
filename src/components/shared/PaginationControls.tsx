// /src/components/shared/PaginationControls.tsx
'use client'

import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  basePath?: string; // Optional: for server-side pagination
}

/**
 * A reusable component to render pagination controls.
 * It supports both client-side state changes (via onPageChange) and server-side routing (via basePath).
 * @param currentPage - The currently active page.
 * @param totalPages - The total number of pages.
 * @param onPageChange - Callback function to handle page changes for client-side state.
 * @param basePath - The base path for page links (e.g., '/videos') for server-side navigation.
 */
export const PaginationControls: React.FC<PaginationControlsProps> = ({ currentPage, totalPages, onPageChange, basePath }) => {

  const handlePageClick = (page: number, e: React.MouseEvent) => {
    if (onPageChange) {
      e.preventDefault();
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink href={basePath ? `${basePath}?page=${i}` : '#'} onClick={(e) => handlePageClick(i, e)} isActive={i === currentPage}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      }
      if (currentPage > totalPages - 3) {
        startPage = totalPages - 4;
        endPage = totalPages;
      }

      if (startPage > 1) {
        pageNumbers.push(
          <PaginationItem key="1">
            <PaginationLink href={basePath ? `${basePath}?page=1` : '#'} onClick={(e) => handlePageClick(1, e)}>1</PaginationLink>
          </PaginationItem>
        );
        if (startPage > 2) {
          pageNumbers.push(<PaginationItem key="start-ellipsis"><PaginationEllipsis /></PaginationItem>);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink href={basePath ? `${basePath}?page=${i}` : '#'} onClick={(e) => handlePageClick(i, e)} isActive={i === currentPage}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push(<PaginationItem key="end-ellipsis"><PaginationEllipsis /></PaginationItem>);
        }
        pageNumbers.push(
          <PaginationItem key={totalPages}>
            <PaginationLink href={basePath ? `${basePath}?page=${totalPages}` : '#'} onClick={(e) => handlePageClick(totalPages, e)}>{totalPages}</PaginationLink>
          </PaginationItem>
        );
      }
    }
    return pageNumbers;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={basePath ? `${basePath}?page=${Math.max(1, currentPage - 1)}` : '#'} onClick={(e) => handlePageClick(Math.max(1, currentPage - 1), e)} />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext href={basePath ? `${basePath}?page=${Math.min(totalPages, currentPage + 1)}` : '#'} onClick={(e) => handlePageClick(Math.min(totalPages, currentPage + 1), e)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
