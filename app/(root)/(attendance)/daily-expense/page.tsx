"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  date: z.string().nonempty("Date is required."),
  operatorGeneral: z
    .number({ invalid_type_error: "Must be a number." })
    .min(0, { message: "Value must be at least 0." }),
  operatorOvertime: z
    .number({ invalid_type_error: "Must be a number." })
    .min(0, { message: "Value must be at least 0." }),
  helperGeneral: z
    .number({ invalid_type_error: "Must be a number." })
    .min(0, { message: "Value must be at least 0." }),
  helperOvertime: z
    .number({ invalid_type_error: "Must be a number." })
    .min(0, { message: "Value must be at least 0." }),
  cuttingGeneral: z
    .number({ invalid_type_error: "Must be a number." })
    .min(0, { message: "Value must be at least 0." }),
  cuttingOvertime: z
    .number({ invalid_type_error: "Must be a number." })
    .min(0, { message: "Value must be at least 0." }),
  finishingGeneral: z
    .number({ invalid_type_error: "Must be a number." })
    .min(0, { message: "Value must be at least 0." }),
  finishingOvertime: z
    .number({ invalid_type_error: "Must be a number." })
    .min(0, { message: "Value must be at least 0." }),
  qualityGeneral: z
    .number({ invalid_type_error: "Must be a number." })
    .min(0, { message: "Value must be at least 0." }),
  qualityOvertime: z
    .number({ invalid_type_error: "Must be a number." })
    .min(0, { message: "Value must be at least 0." }),
  staff: z
    .number({ invalid_type_error: "Must be a number." })
    .min(0, { message: "Value must be at least 0." }),
});

export default function AttendanceForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: "",
      operatorGeneral: 0,
      operatorOvertime: 0,
      helperGeneral: 0,
      helperOvertime: 0,
      cuttingGeneral: 0,
      cuttingOvertime: 0,
      finishingGeneral: 0,
      finishingOvertime: 0,
      qualityGeneral: 0,
      qualityOvertime: 0,
      staff: 0,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Attendance Submitted",
      description: (
        <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    form.reset();
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Attendance Form</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Date Input */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Operator Attendance */}
            <FormField
              control={form.control}
              name="operatorGeneral"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operator General</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
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
              name="operatorOvertime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operator Overtime</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
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

            {/* Helper Attendance */}
            <FormField
              control={form.control}
              name="helperGeneral"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Helper General</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
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
              name="helperOvertime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Helper Overtime</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
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

            {/* Cutting Attendance */}
            <FormField
              control={form.control}
              name="cuttingGeneral"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cutting General</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
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
              name="cuttingOvertime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cutting Overtime</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
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

            {/* Finishing Attendance */}
            <FormField
              control={form.control}
              name="finishingGeneral"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Finishing General</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
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
              name="finishingOvertime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Finishing Overtime</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
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

            {/* Quality Attendance */}
            <FormField
              control={form.control}
              name="qualityGeneral"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quality General</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
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
              name="qualityOvertime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quality Overtime</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
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

            {/* Staff */}
            <FormField
              control={form.control}
              name="staff"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Staff</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
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
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
