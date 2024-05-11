"use client";

import { Plus, X } from "lucide-react";

import { useParams, useRouter } from "next/navigation";
import { useState, useRef, ElementRef, useEffect, useCallback } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { useAction } from "@/hooks/use-action";
import { creaetList } from "@/actions/create-list";
import { ListWrapper } from "./list-wrapper";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-button";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const ListForm = () => {
  const router = useRouter();
  const params = useParams();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const focusInput = useCallback(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    })
  }, []);

  if (focus) {
    focusInput();
  }

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(creaetList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}"`);
      formRef.current?.reset();
      setFocus(true);
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    execute({
      title,
      boardId
    });
  }

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-sm"
        >
          <FormInput 
            ref={inputRef}
            errors={fieldErrors}
            id="title"
            className="text-sm px-2 py-1 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title..."
          />
          <input 
            hidden
            value={params.boardId}
            name="boardId"
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>
              Add list
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
      </ListWrapper>
    );
  };

  return (
    <ListWrapper>
      <button 
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};
