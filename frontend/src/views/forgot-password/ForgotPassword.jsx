/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../store/useAuthStore';

const ForgotPassword = () => {

  const { isLoading, error, forgotPassword } = useAuthStore()
  const [isSubmitted, setIsSubmitted] = useState(false);

   const { register, handleSubmit, watch } = useForm({});
  return (
    <div>ForgotPassword</div>
  )
}

export default ForgotPassword