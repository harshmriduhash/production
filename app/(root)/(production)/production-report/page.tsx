"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Define the schema
const FormSchema = z.object({
  lineNo: z
    .number({ invalid_type_error: "Line No must be a number." })
    .min(1, { message: "Line No is required." }),
  productionOrderId: z.string().nonempty("Production Order ID is required."),
  dailyProduction: z
    .number({ invalid_type_error: "Daily Production must be a number." })
    .min(1, {
      message: "Daily Production must be greater than 0.",
    }),
});

export default function ProductionReportForm() {
  const { toast } = useToast();
  const [orderOptions, setOrderOptions] = useState([]);
  const [entries, setEntries] = useState<any>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      lineNo: 0,
      productionOrderId: "",
      dailyProduction: 0,
    },
  });

  // Fetch production order data
  useEffect(() => {
    fetch("/api/production-order/status?status=IN_PROGRESS")
      .then((res) => res.json())
      .then((data) => {
        setOrderOptions(data);
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to fetch production orders.",
        });
      });
  }, []);

  // Handle form submission
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setEntries((prev: any) => [...prev, data]);
    toast({
      title: "Entry Added",
      description: "Your production report has been added successfully.",
    });
    form.reset();
  }

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="p-6 border rounded-md shadow">
          <h1 className="text-2xl font-bold mb-4">Production Report Form</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="lineNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Line No</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter line number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productionOrderId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Production Order ID</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a production order" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {orderOptions.map((order: any) => (
                          <SelectItem key={order.id} value={order.id}>
                            {order.styleNo} {/* Customize if needed */}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dailyProduction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Daily Production</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter daily production"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </div>

        {/* Data Table Section */}
        <div className="p-6 border rounded-md shadow">
          <h1 className="text-2xl font-bold mb-4">Production Entries</h1>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-slate-500">
              <thead className="bg-slate-200">
                <tr>
                  <th className="border border-slate-600 px-4 py-2">Line No</th>
                  <th className="border border-slate-600 px-4 py-2">
                    Production Order ID
                  </th>
                  <th className="border border-slate-600 px-4 py-2">
                    Daily Production
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.length > 0 ? (
                  entries.map((entry: any, index: any) => (
                    <tr key={index}>
                      <td className="border border-slate-600 px-4 py-2">
                        {entry.lineNo}
                      </td>
                      <td className="border border-slate-600 px-4 py-2">
                        {entry.productionOrderId}
                      </td>
                      <td className="border border-slate-600 px-4 py-2">
                        {entry.dailyProduction}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="text-center border border-slate-600 px-4 py-2"
                    >
                      No entries available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
