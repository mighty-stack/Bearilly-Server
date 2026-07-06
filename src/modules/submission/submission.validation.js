import * as Yup from "yup";

export const submissionSchema = Yup.object({

    submissionType: Yup.string()

        .oneOf([
            "File",
            "Google Drive",
            "Canva",
            "YouTube",
        ])

        .required(),

    fileUrl: Yup.string()

        .nullable(),

});