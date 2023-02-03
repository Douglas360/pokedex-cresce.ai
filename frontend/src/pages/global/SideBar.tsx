import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { SiPokemon } from 'react-icons/si'
import { TbPokeball } from 'react-icons/tb'
import { RiDashboardFill } from 'react-icons/ri'
import { BsChevronDown } from 'react-icons/bs'
import { MdCatchingPokemon} from 'react-icons/md'
import { CgPokemon} from 'react-icons/cg'








export const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [subMenuOpen, setSubMenuOpen] = useState(false)

  const Menus = [
    {
      title: "Dashboard",
      to: "/"
    },
    {
      title: "Time",
      to: "/team",
      icon: <MdCatchingPokemon />,
      submenu: true,
      spacing: false,
      submenuItems: [
        {
          title: "Cadastrar",
          to: "/team/create",
          icon: <CgPokemon />
        },

      ]
    }

  ]


  return (

    <div className={`bg-dark min-h-screen pt-7 pl-3 pr-3 ${isOpen ? "w-72 pt-7" : "w-20 "} relative duration-500`}>

      <AiOutlineArrowLeft className={`bg-white text-dark 
     text-3xl rounded-full absolute -right-3 top-9 border border-dark cursor-pointer ${!isOpen && "rotate-180"} duration-500`}
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className=' w-full h-24 flex justify-center '>
        {isOpen ?
          <SiPokemon className=' text-amber-300 text-8xl rounded cursor-pointer block float-left' />
          :
          <TbPokeball className=' text-amber-300 text-8xl rounded cursor-pointer block float-left' />
        }
      </div>

      <ul className="pt-3 ">
        {Menus.map((menu, index) => (

          <React.Fragment key={index}>

            <li className={`text-white flex items-center gap-x-4 cursor-pointer p-3 hover:bg-light rounded-md
            ${menu.spacing ? "mt-9" : "mt-2"}`}
            >
              <span className='text-3xl block float-left'>
                {menu.icon ? menu.icon : <RiDashboardFill />}
              </span>

              <span className={`text-base font-medium flex-1 ${!isOpen && "hidden"}`}>
                <Link to={menu.to}>{menu.title}</Link>
              </span>
              {menu.submenu && isOpen && (
                <BsChevronDown className={`${subMenuOpen && "rotate-180 duration-300"}`} onClick={() => setSubMenuOpen(!subMenuOpen)} />
              )}
            </li>
            {menu.submenu && subMenuOpen && isOpen && (
              <ul>
                {menu.submenuItems.map((submenu, index) => (
                  <li className='text-white flex items-center gap-x-4 cursor-pointer p-3 hover:bg-light rounded-md px-6' key={index}>
                    <span className='text-3xl block float-left'>
                      {submenu.icon }
                    </span>
                    <Link to={submenu.to}>{submenu.title}</Link>

                  </li>
                ))}
              </ul>
            )}

          </React.Fragment>

        ))}
      </ul>


    </div>






  )
}
