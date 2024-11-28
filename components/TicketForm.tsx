'use client';

import { ticketSchema } from '@/ValidationSchemas/ticket';
import { z } from 'zod';
import axios from 'axios';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useState } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

type TicketFormData = z.infer<typeof ticketSchema>;

export default function TicketForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof ticketSchema>) {
    try {
      setIsSubmitting(true);
      setError('');

      await axios.post('/api/tickets', values);
      setIsSubmitting(false);

      router.push('/tickets');
      router.refresh();
    } catch (error) {
      console.log(error);
      setError('Error submitting ticket. Please try again');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-md border w-full p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Title</FormLabel>
                <FormControl>
                  <Input placeholder="Ticket" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Controller
            control={form.control}
            name="description"
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          <div className="flex gap-6">
            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="OPEN">Open</SelectItem>
                      <SelectItem value="STARTED">Started</SelectItem>
                      <SelectItem value="CLOSED">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Priority */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
