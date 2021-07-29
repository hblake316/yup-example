import React from 'react'
import ReactDOM from 'react-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const validationSchema = yup.object({
  value: yup.string('Enter Value').required('Required'),
  endValue: yup
    .string('Enter End Value')
    .test(
      'Compare Value and End Value',
      'End Value has to be greater than Value.',
      function (x) {
        return x ? parseInt(x) > parseInt(this.parent.value) : true
      },
    ),
})

const WithMaterialUI = () => {
  const formik = useFormik({
    initialValues: {
      value: '0101',
      endValue: '2',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="value"
          name="value"
          label="value"
          value={formik.values.value}
          onChange={formik.handleChange}
          error={formik.touched.value && Boolean(formik.errors.value)}
          helperText={formik.touched.value && formik.errors.value}
        />
        <TextField
          fullWidth
          id="endValue"
          name="endValue"
          label="endValue"
          value={formik.values.endValue}
          onChange={formik.handleChange}
          error={formik.touched.endValue && Boolean(formik.errors.endValue)}
          helperText={formik.touched.endValue && formik.errors.endValue}
        />
        <p>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </p>
      </form>
    </div>
  )
}

ReactDOM.render(<WithMaterialUI />, document.getElementById('root'))
