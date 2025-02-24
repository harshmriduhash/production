"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

// Define validation schema
const FormSchema = z.object({
  programCode: z.string().min(1, {
    message: "Program Code is required.",
  }),
  buyer: z.string().min(1, {
    message: "Buyer is required.",
  }),
  item: z.string().min(1, {
    message: "Item is required.",
  }),
  styleNo: z.string().min(1, {
    message: "Style No is required.",
  }),
  orderQty: z
    .number({ invalid_type_error: "Order Quantity must be a number." })
    .min(1, { message: "Order Quantity must be greater than 0." }),
  percentage: z
    .number({ invalid_type_error: "Percentage must be a number." })
    .min(0, { message: "Percentage must be at least 0." })
    .max(100, { message: "Percentage cannot exceed 100." }),
  unitPrice: z
    .number({ invalid_type_error: "Unit Price must be a number." })
    .min(0.01, { message: "Unit Price must be at least 0.01." }),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETE", "CANCELLED"], {
    errorMap: () => ({ message: "Invalid status value." }),
  }),
})

export default function OrderForm() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      programCode: "",
      buyer: "",
      item: "",
      styleNo: "",
      orderQty: 0,
      percentage: 15,
      unitPrice: 0,
      status: "PENDING",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold">Order Form</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="programCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Code</FormLabel>
                    <FormControl>
                      <Input placeholder="639" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buyer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Buyer</FormLabel>
                    <FormControl>
                      <Input placeholder="RUTA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="item"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item</FormLabel>
                    <FormControl>
                      <Input placeholder="Shirt" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="styleNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Style No</FormLabel>
                    <FormControl>
                      <Input placeholder="52H-9700" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="orderQty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="3520"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Percentage</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="15"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unitPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="2.04"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="COMPLETE">Complete</SelectItem>
                        <SelectItem value="CANCELLED">Canceled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
