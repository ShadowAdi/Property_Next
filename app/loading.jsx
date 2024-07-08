'use client'
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const LoadingPage = ({loading}) => {
  return (
    <ClipLoader
    color="#3b82f6"
    loading={loading}
    cssOverride={override}
    size={150}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
  )
}

export default LoadingPage
