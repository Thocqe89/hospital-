import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const roles = {
  "approve": ['001'],
  "newpatients": ['001','001', '003'],
  "bookq": ['001', '003'],
 
  "patientsEdit": ['001', '003', '002'],
  "patientsQ": ['001', '003'],
  "patientsEditButtonView": ['001', '003'],
  "patientsCasesButton": ['001', '003', '002'],
  "patientsCasesButtonNew": ['001', '002'],
  "patientsCasesButtonPrint": ['001', '003'],
  "patientsCasesButtonViewcase": ['001', '003', '002'],
  "patientsCasesButtonViewcaseEdit": ['001', '003'],
  "user": ['001'],
  "BokingButton": ['001', '003'],


  "patients": ['001', '002'],
  "all":['002','001','003'],
  "superaddmin":['001']

}
export const canAccess = (name, role) => {
  if (!role) return false
  const getName = roles[name]
  if (!getName) return false
  const getRole = getName.find(item => item === role)
  if (!getRole) return false
  return true
}