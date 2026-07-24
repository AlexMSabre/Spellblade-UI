import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function story() {
    return (
    <div className="story">
        <div className="appearance">
            Appearance and Description
            <Field>
                <Input name="Appearance"
                />
            </Field>
        </div>
        <div className="story">
            Background and Story
            <Field>
                <Input name="Story"
                />
            </Field>
        </div>
        <div className="motivations">
            Motivations
            <Field>
                <Input name="Motivations"
                />
            </Field>
        </div>
    </div>
)
}