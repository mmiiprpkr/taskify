"use client";

import { toast } from "sonner";
import { forwardRef, useRef, ElementRef, KeyboardEventHandler, useEffect } from "react";
import { useParams } from "next/navigation";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSubmit } from "@/components/form/form-button";

import { useAction } from "@/hooks/use-action";
import { createCard } from "@/actions/create-card";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

type Props = {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
  focusTextarea: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, Props>(({
  listId,
  enableEditing,
  disableEditing,
  isEditing,
  focusTextarea
}, ref) => {
  const params = useParams();
  const formRef = useRef<ElementRef<"form">>(null);

  useEffect(() => {
    if (isEditing) {
      focusTextarea();
    };
  }, [isEditing, focusTextarea]);

  const { execute, fieldErrors } = useAction(createCard, {
    onSuccess(data) {
      toast.success(`Card "${data.title}" created`)
      formRef.current?.reset();
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    };
  };

  useOnClickOutside(formRef, disableEditing);
  useEventListener("keydown", onKeyDown);

  const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    };
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const listId = formData.get("listId") as string;
    const boardId = params.boardId as string;
    
    execute({ title, listId, boardId });
  }

  if (isEditing) {
    return (
      <form
        ref={formRef}
        action={onSubmit}
        className="m-1 py-0.5 px-1 space-y-4"
      >
        <FormTextarea 
          id="title"
          onKeyDown={onTextareaKeyDown}
          ref={ref}
          placeholder="Enter a title for this card..."
          errors={fieldErrors}
        />
        <input 
          hidden
          id="listId"
          name="listId"
          value={listId}
        />
        <div className="flex items-center gap-x-1">
          <FormSubmit>
            Add card
          </FormSubmit>
          <Button
            onClick={disableEditing}
            size="sm"
            variant="ghost"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className="pt-2 px-2">
      <Button
        onClick={enableEditing}
        className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
        size="sm"
        variant="ghost"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add a card
      </Button>
    </div>
  );
});

CardForm.displayName = "CardForm";