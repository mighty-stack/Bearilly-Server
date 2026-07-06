import * as Yup from "yup";

const createAssessmentSchema =
  Yup.object({

    title: Yup.string()
      .required(),

    description:
      Yup.string()
        .required(),

    instructions:
      Yup.string()
        .required(),

    category:
      Yup.string()
        .required(),

    deadline:
      Yup.date()
        .required(),

  });

  export default createAssessmentSchema 