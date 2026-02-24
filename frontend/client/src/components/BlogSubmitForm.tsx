import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Send } from "lucide-react";

const blogSubmitSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(20, "Message must be at least 20 characters"),
  anonymous: z.boolean().default(false),
});

type BlogSubmitValues = z.infer<typeof blogSubmitSchema>;

export function BlogSubmitForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<BlogSubmitValues>({
    resolver: zodResolver(blogSubmitSchema),
    defaultValues: {
      name: "",
      phone: "",
      title: "",
      content: "",
      anonymous: false,
    },
  });

  function onSubmit(data: BlogSubmitValues) {
    console.log("Blog submission (UI only):", data);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-green-900 mb-2">Thank You!</h3>
        <p className="text-green-700">
          Your submission has been received and will be reviewed before publishing.
        </p>
        <Button 
          variant="outline" 
          className="mt-6 border-green-200 text-green-700 hover:bg-green-100"
          onClick={() => {
            setSubmitted(false);
            form.reset();
          }}
        >
          Submit another response
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
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
                <FormLabel>Phone (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="+91 87007 62477" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog/Review Title</FormLabel>
              <FormControl>
                <Input placeholder="My experience with AquaShield..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message / Review / Blog Content</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Share your thoughts or details about your service experience here..." 
                  className="min-h-[150px] resize-none"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="anonymous"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Submit anonymously
                </FormLabel>
                <p className="text-xs text-slate-500">
                  Your identity will not be shown publicly if this review is published.
                </p>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20">
          <Send className="w-4 h-4 mr-2" /> Submit for Review
        </Button>
      </form>
    </Form>
  );
}
