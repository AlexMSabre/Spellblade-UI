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

export default function Specialties() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const specialtyList = (<SelectContent>
    <SelectGroup>
      <SelectLabel>Specialties</SelectLabel>
      <SelectItem value="1">Witch</SelectItem>
      <SelectItem value="2">Wayfarer</SelectItem>
    </SelectGroup>
  </SelectContent>);


  return (
    <Controller
      name="title"
      control={form.control}
      render={({ field, fieldState }) => (
        <div>
          <h2>Specialities</h2>
          <p>Choose your Specialites.</p>
          <div className="flex flex-row gap-7">
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Specialty One</FieldLabel>
              <Select name="specialty1">
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select a Specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialtyList}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
            <Field>
              <FieldLabel htmlFor={field.name}>Specialty Two</FieldLabel>
              <Select name="specialty2">
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select a Specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialtyList}
                </SelectContent>
              </Select>
            </Field>
          </div>
          <h3>Aspects</h3>
          <p> please choose your aspects.  we will make this menu dynamic and collapsible later</p>
          <div className="flex flex-row gap-4">
            <Card>
              <Field>
                <div className="flex flex-row gap-1">
                  <Switch id="aspect 1" name="aspect1-1" /> <Label htmlFor={field.name}>Aspect 1</Label>
                </div>
                <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
              </Field>
            </Card>
            <Card>
              <Field>
                <div className="flex flex-row gap-1">
                  <Switch id="aspect 1" name="aspect2-1" /> <Label htmlFor={field.name}>Aspect 1</Label>
                </div>
                <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
              </Field>
            </Card>
          </div>
          <div className="flex flex-row gap-4">
            <Card>
              <Field>
                <div className="flex flex-row gap-1">
                  <Switch id="aspect 2" name="aspect1-2" /> <Label htmlFor={field.name}>Aspect 2</Label>
                </div>
                <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
              </Field>
            </Card>
            <Card>
              <Field>
                <div className="flex flex-row gap-1">
                  <Switch id="aspect 2" name="aspect2-2" /> <Label htmlFor={field.name}>Aspect 2</Label>
                </div>
                <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
              </Field>
            </Card>
          </div>
          <div className="flex flex-row gap-4">
            <Card>
              <Field>
                <div className="flex flex-row gap-1">
                  <Switch id="aspect 3" name="aspect1-3" /> <Label htmlFor={field.name}>Aspect 3</Label>
                </div>
                <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
              </Field>
            </Card>
            <Card>
              <Field>
                <div className="flex flex-row gap-1">
                  <Switch id="aspect 3" name="aspect2-3" /> <Label htmlFor={field.name}>Aspect 3</Label>
                </div>
                <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
              </Field>
            </Card>
          </div>
          <div className="flex flex-row gap-4">
            <Card>
              <Field>
                <div className="flex flex-row gap-1">
                  <Switch id="aspect 4" name="aspect1-4" /> <Label htmlFor={field.name}>Aspect 4</Label>
                </div>
                <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
              </Field>
            </Card>
            <Card>
              <Field>
                <div className="flex flex-row gap-1">
                  <Switch id="aspect 4" name="aspect2-4" /> <Label htmlFor={field.name}>Aspect 4</Label>
                </div>
                <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
              </Field>
            </Card>
          </div>
        </div>)}
          />
      );
}