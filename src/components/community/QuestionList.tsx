import { Question } from "@/types/question";
import { QuestionCard } from "./QuestionCard";
import { QuestionSkeleton } from "./QuestionSkeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuestionListProps {
  questions: Question[];
  isLoading?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: { 
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.slice(
    Math.max(0, Math.min(currentPage - 3, totalPages - 5)),
    Math.min(totalPages, Math.max(5, currentPage + 2))
  );

  return (
    <div className="flex items-center justify-center gap-1 mt-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {visiblePages[0] > 1 && (
        <>
          <Button
            variant={currentPage === 1 ? "secondary" : "outline"}
            size="icon"
            onClick={() => onPageChange(1)}
          >
            1
          </Button>
          {visiblePages[0] > 2 && <span className="px-2">...</span>}
        </>
      )}
      
      {visiblePages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "secondary" : "outline"}
          size="icon"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && <span className="px-2">...</span>}
          <Button
            variant={currentPage === totalPages ? "secondary" : "outline"}
            size="icon"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Button>
        </>
      )}
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function QuestionList({
  questions,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
}: QuestionListProps) {
  if (isLoading) {
    return (
      <div className="divide-y divide-border/40 rounded-lg border border-border/40">
        {Array.from({ length: 5 }).map((_, index) => (
          <QuestionSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="divide-y divide-border/40 rounded-lg border border-border/40">
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
          />
        ))}
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
} 