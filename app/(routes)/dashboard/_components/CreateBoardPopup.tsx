'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import useGetOrgId from '@/lib/hooks/useGetOrgId';
import useOrganizationStore from '@/store/organization';
import { useMutation } from 'convex/react';
import React from 'react';
import { useForm } from 'react-hook-form';

type NewBoard = {
  name: string;
};

const CreateBoardPopup = ({
  onBoardCreatedSuccessfully,
  onOpenChange,
}: {
  onBoardCreatedSuccessfully: () => void;
  onOpenChange: () => void;
}) => {
  const form = useForm<NewBoard>();
  const mutation = useMutation(api.boards.mutation.createBoard);
  const selectedOrgId = useGetOrgId();

  const createBoardHandler = (values: NewBoard) => {
    mutation({
      name: values.name,
      orgId: selectedOrgId as Id<'organizations'>,
      type: '',
    });
    onBoardCreatedSuccessfully();
  };

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createBoardHandler)}>
            <h1>Create new board</h1>
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Board Name:</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register('name', {
                        required: true,
                        maxLength: 30,
                      })}
                      placeholder="Ex: Playground"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button type="submit" disabled={!!Object.keys(form.formState.errors).length}>
                Create Board
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoardPopup;
