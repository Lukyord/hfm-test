type FieldErrorProps = {
    error: string;
    id?: string;
};

export default function FieldError({ error, id }: FieldErrorProps) {
    return (
        <div className="field-error" role="alert" aria-live="polite" id={id}>
            <p>{error}</p>
        </div>
    );
}
