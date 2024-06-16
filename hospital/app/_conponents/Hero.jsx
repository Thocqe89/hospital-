"Use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Facebook } from '@mui/icons-material'

function Hero() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <Image
              alt=""
              src="/21.jpg"
              width={800} // Set the width of your image
              height={800}
              className="absolute inset-0 h-full
            rounded-3xl
            w-full object-cover"
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">ໂຮງຫມໍ<samp className='text-primary'> ເສດຖາທິຣາດ </samp><samp className='text-rose-700 font-bold sm:text-4xl'>+<samp className='text-primary'> Setthathirath</samp></samp> hospital  </h2>

            <p className="mt-4 text-gray-600">
              ວັນທີ 24 ພະຈິກ 2023, ໂຮງໝໍເຊດຖາທິຣາດ ໄດ້ຈັດກິດຈະກຳສະເຫຼີມສະລອງວັນເບົາຫວານໂລກ, ໄດ້ຈັດຕັ້ງປະຕິບັດກັນເປັນປົກກະຕິໃນແຕ່ລະປີ. ເຊິ່ງການຈັດງານໃນຄັ້ງນີ້ ໄດ້ຮັບກຽດຈາກ
              ທ່ານ ດຣ. ໄພວັນ ແກ້ວປະເສີດ, ຮອງລັດຖະມົນຕີກະຊວງສາທາລະສະສຸກ.
              ທ່ານ ດຣ ຫວັງນະຄອນ ດິດຕະພົງ ຜູ້ອຳນວຍການ ໂຮງໝໍເຊດຖາທິຣາດ
              ທ່ານ ບຸນມີ ສົມສະມຸດ ຄະນະກຳມະການວິຊາຊີບທ່ານໝໍ ສະພາຄຸ້ມຄອງວິຊາຊີບປີ່ນປົວ.
              , ເປັນປະທານເປີດງານໃນຄັ້ງນີ້ ແລະ ຍັງໄດ້ຮັບຄວາມຮູ້ກ່ຽວກັບພະຍາດເບົາຫວານ, ການປະຕິບັດຕົວ ແລະ ບັນຍາຍຢາພື້ນເມືອງສຳລັບພະຍາດເບົາຫວານ ຈາກວິຊາການສະເພາະທາງ ແລະ ທາງ ໂຮງໝໍເຊດຖາທິຣາດ ຂໍຂອບໃຈເປັນຢ່າງສູງຈາກບັນດາບໍລິສັດ ທີ່ສະໜັບສະໜູນງານໃນຄັ້ງນີ້ດ້ວຍ
            </p>
            <Link href='https://www.facebook.com/profile.php?id=100064289583950'>
            <Button className="mt-10"><span> <Facebook/> </span> ຂໍ້ມູນເພີ່ມເຕີມ</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
