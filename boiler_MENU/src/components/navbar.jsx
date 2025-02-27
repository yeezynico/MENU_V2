import React, { useState } from 'react';
import '../index.scss';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { nightModeAtom, userAtom } from '../atoms';
import logoNavJour from '../../src/assets/images/logo-nav-jour.svg';
import logoNavNuit from '../../src/assets/images/logo-nav-nuit.svg';

const Nav = ({ toggleTheme }) => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isNightMode] = useAtom(nightModeAtom);
  const [user] = useAtom(userAtom);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  };

  return (
    <nav>
      {user.isLoggedIn ? (
        <div className="navbar">
          <label className='switch'>
            <input type='checkbox' className='toggle' onChange={toggleLanguage} checked={currentLanguage === 'en'} />
            <span className={`slider ${isNightMode ? 'night' : 'day'}`}></span>
          </label>
          <div className='nav-links'>
            <Link to="/restaurants"> <p> RESTAURANTS </p> </Link>
            <Link to="/"> <img src={isNightMode ? logoNavNuit : logoNavJour} alt='Logo navbar' /> </Link>
            <Dropdown className='btn-dropdown'>
              <Dropdown.Toggle className='gold log'> MON ESPACE CLIENT/PRO </Dropdown.Toggle>
              <Dropdown.Menu className='drop-box'>
                <Dropdown.Item as={Link} to="/profile" className='drop-text'> {t('profil')} </Dropdown.Item>
                <Dropdown.Item as={Link} to="/logout" className='drop-text'> {t('seDeconnecter')} </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className='theme-toggler'>
            <button id="themeLogo" onClick={toggleTheme}>
              {isNightMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
    ) : (
      <div className="navbar">
        <label className='switch'>
          <input type='checkbox' className='toggle' onChange={toggleLanguage} checked={currentLanguage === 'en'} />
          <span className={`slider ${isNightMode ? 'night' : 'day'}`}></span>
        </label>
        <div className='nav-links'>
          <Link to="/restaurants"> <p> RESTAURANTS </p> </Link>
          <div>
          <Link to="/"> <img src={isNightMode ? logoNavNuit : logoNavJour} alt='Logo navbar' /> </Link>
          </div>
          <Dropdown className='btn-dropdown'>
            <Dropdown.Toggle className='gold log'> {t('connexion')} </Dropdown.Toggle>
            <Dropdown.Menu className='drop-box'>
              <Dropdown.Item as={Link} to="/login" className='drop-text'> {t('seConnecter')} </Dropdown.Item>
              <Dropdown.Item as={Link} to="/signup" className='drop-text'> {t('sinscrire')} </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className='theme-toggler'>
          <button id="themeLogo" onClick={toggleTheme}>
            {isNightMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    )}
    </nav>
  );
}

export default Nav;
