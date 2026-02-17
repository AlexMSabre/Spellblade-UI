import { Card } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
})

export default function Start() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  return (
    <Controller
      name="title"
      control={form.control}
      render={({ field, fieldState }) => (
        <div>
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Character Name</FieldLabel>
            <Input
              name="name"
              aria-invalid={fieldState.invalid}
              placeholder="E.G. Timmy Dragon-Slayer"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
          <Field data-invalid={fieldState.invalid}>
            <Select>
              <Select name="aspectLevel">
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select a Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Aspect Level</SelectLabel>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Select>
          </Field>
        </div>)}
    />
  );
}