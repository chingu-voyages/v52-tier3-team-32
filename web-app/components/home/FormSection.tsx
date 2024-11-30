'use client';

import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  CreateAppoitmentSchema,
  CreateAppoitmentValues,
} from '@/resolvers/create-appoitment.resolver';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../ui/popover';
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';

export default function () {
  const form = useForm<CreateAppoitmentValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      date: new Date(),
    },
    resolver: zodResolver(CreateAppoitmentSchema),
    mode: 'onTouched',
  });

  const onSubmit = (formData: CreateAppoitmentValues) => {};

  return (
    <section className="w-1/2 flex-1">
      <Form {...form}>
        <form
          action=""
          className="bg-[#1B1C20] p-5 rounded-xl h-full flex flex-col"
        >
          <h2 className="text-white text-xl font-medium">
            Make an <span className="text-[#8B53FB]">Appoitment</span> Now!{' '}
          </h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#3D3E42]">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name..."
                    {...field}
                    className="bg-[#16151A] border-[#202024] text-white"
                  />
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
                <FormLabel className="text-[#3D3E42]">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email..."
                    {...field}
                    className="bg-[#16151A] border-[#202024] text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#3D3E42]">Phone number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="number..."
                    {...field}
                    className="bg-[#16151A] border-[#202024] text-white"
                  />
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
                <FormLabel className="text-[#3D3E42]">Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="address..."
                    {...field}
                    className="bg-[#16151A] border-[#202024] text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#3D3E42]">Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: Date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {/* <FormControl>
                  <Input
                    placeholder="date..."
                    {...field}
                    className="bg-[#16151A] border-[#202024] text-white"
                    type='date'
                  />
                </FormControl> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-[#8B53FB] h-12 font-light hover:bg-[#6438BD] text-lg text-white mt-auto mb-6 w-full">
            Make an appoitment
          </Button>
        </form>
      </Form>
    </section>
  );
}
