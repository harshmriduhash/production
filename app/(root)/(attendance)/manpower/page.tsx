"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon } from "lucide-react";

// Define schema for form validation
const FormSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
});

export default function ManpowerTable() {
  const [manpower, setManpower] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function fetchManpower(date: string) {
    try {
      setLoading(true);
      const response = await fetch(`/api/manpower?date=${date}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data: any = await response.json();
      setManpower(data.data);
    } catch (error: any) {
      toast({
        title: "Error fetching data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const [date, setDate] = React.useState<any>(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Reset time to 00:00:00
    return now;
  });

  if (date === undefined || date === null) {
    useEffect(() => {
      fetchManpower(new Date().toISOString());
    }, [date]);
  } else {
    useEffect(() => {
      fetchManpower(date.toISOString());
    }, [date]);
  }

  return (
    <div className="grid grid-cols-2 max-w-2xl mx-auto">
      <div className="py-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md"
        />
      </div>

      <div className="border mt-4">
        {loading ? (
          <div className="p-4 text-center flex flex-col justify-center items-center h-full">
            Loading...
          </div>
        ) : manpower && manpower.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Field</TableHead>
                <TableHead className="text-center">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {manpower.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell className="text-left pr-4 font-semibold">
                      Date
                    </TableCell>
                    <TableCell className="text-center">
                      {new Intl.DateTimeFormat("en-GB").format(
                        new Date(item.date)
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-left pr-4 font-semibold">
                      Operator
                    </TableCell>
                    <TableCell className="text-center">
                      {item.operator}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-left pr-4 font-semibold">
                      Helper
                    </TableCell>
                    <TableCell className="text-center">{item.helper}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-left pr-4 font-semibold">
                      Iron Input
                    </TableCell>
                    <TableCell className="text-center">
                      {item.ironInput}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-left pr-4 font-semibold">
                      Cutting
                    </TableCell>
                    <TableCell className="text-center">
                      {item.cutting}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-left pr-4 font-semibold">
                      Finishing
                    </TableCell>
                    <TableCell className="text-center">
                      {item.finishing}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-left pr-4 font-semibold">
                      Quality
                    </TableCell>
                    <TableCell className="text-center">
                      {item.quality}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-left pr-4 font-semibold">
                      Staff
                    </TableCell>
                    <TableCell className="text-center">{item.staff}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-left pr-4 font-semibold">
                      Cleaner
                    </TableCell>
                    <TableCell className="text-center">
                      {item.cleaner}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-left pr-4 font-semibold">
                      Loader
                    </TableCell>
                    <TableCell className="text-center">{item.loader}</TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-100">
                    <TableCell className="text-left pr-4 font-semibold py-4">
                      Total
                    </TableCell>
                    <TableCell className="text-center">{item.total}</TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-4 text-center flex flex-col justify-center items-center h-full">
            No data available. Search by date.
          </div>
        )}
      </div>
    </div>
  );
}
