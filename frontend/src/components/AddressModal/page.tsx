// components/AddressFormModal.tsx

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { AlertDialogFooter } from "../ui/alert-dialog";
import { AlertDialogAction, AlertDialogCancel } from "@radix-ui/react-alert-dialog";

const FormSchema = z.object({
  firstname: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  mobile: z.string().min(10, {
    message: "Mobile number must be at least 10 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  pincode: z.string().min(6, {
    message: "Pincode must be at least 6 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  street: z.string().min(2, {
    message: "Street must be at least 2 characters.",
  }),
  zip: z.string().min(5, {
    message: "Zip code must be at least 5 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
});

type AddressFormValues = z.infer<typeof FormSchema>;

export function AddressFormModal({ onSubmit, onClose }: { onSubmit: (data: any) => void, onClose: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "John",
      lastname: "Doe",
      mobile: "1234567890",
      email: "john.doe@example.com",
      pincode: "123456",
      city: "New York",
      street: "5th Avenue",
      zip: "10001",
      address: "123 Main St",
      state: "NY",
    },
  });

  const handleSubmit = (data: AddressFormValues) => {
    onSubmit(data);
    toast({
      title: "Address submitted successfully",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    <div>
      {isModalOpen && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full grid gap-5  grid-cols-2">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter First Name" {...field} className="p-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Last Name" {...field} className="p-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Mobile Number" {...field} className="p-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Email" {...field} className="p-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Pincode" {...field} className="p-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter City" {...field} className="p-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Street" {...field} className="p-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Zip Code" {...field} className="p-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Address" {...field} className="p-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter State" {...field} className="p-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter className="col-span-2 flex gap-2">
              <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
              <Button type="submit" className="mx-5 ml-4 bg-primaryMain hover:bg-primaryMain">
                <AlertDialogAction className="">Next</AlertDialogAction>
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      )}
    </div>
  );
}
