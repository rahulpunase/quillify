"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type OrganizationFormInputs = {
  name: string;
  description: string;
  type: string;
};

const CreateOrganization = ({
  onSuccessfullyOrganizationCreated,
}: {
  onSuccessfullyOrganizationCreated: (orgId: string) => void;
}) => {
  const form = useForm<OrganizationFormInputs>();
  const createOrganization = useMutation(
    api.organization.mutation.createOrganization
  );

  const createOrganizationSubmitHandler = async ({
    description,
    name,
    type,
  }: OrganizationFormInputs) => {
    const id = await createOrganization({
      description,
      name,
      type,
    });
    onSuccessfullyOrganizationCreated(id as string);
    // router.push("/dashboard");
  };

  return (
    <Card className="p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(createOrganizationSubmitHandler)}>
          <h1 className="text-2xl font-semibold">Create Organization</h1>
          <div className="mt-8">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name:</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register("name", {
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

            <FormField
              name="description"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Description:</FormLabel>
                  <FormControl>
                    <Textarea
                      {...form.register("description", {
                        required: true,
                        maxLength: 200,
                      })}
                      placeholder="Describe what you do"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="type"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Organization Type:</FormLabel>
                  <FormControl>
                    <Select
                      {...form.register("type", {
                        required: true,
                      })}
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Type:" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="team">Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormItem className="mt-8">
              <Button
                type="submit"
                className="w-full"
                disabled={!!Object.keys(form.formState.errors).length}
              >
                Create
              </Button>
            </FormItem>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default CreateOrganization;
