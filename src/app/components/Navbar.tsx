"use client";

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link'; // Importez le composant Link de Next.js

const Container = styled.div`
    height: 100px;
    background-color: rgba(255, 255, 255, 0.1); /* Transparence */
    display: flex;
    justify-content: center;
    backdrop-filter: blur(10px); /* Effet de flou */
    position: fixed; /* Fixe la Navbar en haut de la page */
    top: 0; /* Positionne en haut */
    left: 0; /* Positionne à gauche */
    width: 100%; /* Prend toute la largeur */
    z-index: 1000; /* Assure que la Navbar est au-dessus des autres éléments */
    mask-image: linear-gradient(
        to bottom,
        black 70%,
        transparent 100% 
    );
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 20px;
`;

const Left = styled.div`
    display: flex;
    align-items: center;
`;

const Language = styled.span`
    font-size: 18px;
    cursor: pointer;

    @media (max-width: 768px) {
        display: none; /* Masquer le sélecteur de langue sur les petits écrans */
    }
`;

const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px; /* Espacement entre les MenuItem */
    position: absolute; /* Position absolue pour centrer */
    left: 50%; /* Déplace le conteneur à 50% de la gauche */
    transform: translateX(-50%); /* Centre le conteneur */

    @media (max-width: 768px) {
        gap: 10px; /* Réduire l'espacement sur les petits écrans */
    }
`;

const MenuItem = styled.div`
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.3s ease; /* Animation fluide */
    text-decoration: none; /* Annule le soulignement */

    &:hover {
        color: #0CFF21; /* Changement de couleur au survol */
        transform: scale(1.1); /* Effet de zoom au survol */
    }

    @media (max-width: 768px) {
        font-size: 12px; /* Réduire la taille de la police sur les petits écrans */
        text-decoration: none; /* Assure qu'il n'y a pas de soulignement */
    }

    @media (max-width: 480px) {
        font-size: 10px; /* Réduire encore plus la taille de la police sur les très petits écrans */
        text-decoration: none; /* Assure qu'il n'y a pas de soulignement */
    }
`;

const Right = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const Logo = styled.img`
    height: 90px;

    @media (max-width: 768px) {
        height: 70px; /* Réduire la taille du logo sur les petits écrans */
    }
`;

const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link href="/"> {/* Redirige vers la page d'accueil */}
                        <Logo src={`${process.env.PUBLIC_URL}/image/navbar/logo_navbar.png`} alt="Logo"/>
                    </Link>
                </Left>
                <Center>
                    <Link href="/projets" passHref> {/* Redirige vers la page Projets */}
                        <MenuItem>PROJETS</MenuItem>
                    </Link>
                    <Link href="/event" passHref> {/* Redirige vers la page Événements */}
                        <MenuItem>EVENTS</MenuItem>
                    </Link>
                    <Link href="/shop" passHref> {/* Redirige vers la page Boutique */}
                        <MenuItem>BOUTIQUE</MenuItem>
                    </Link>
                </Center>
                <Right>
                    <Language>EN</Language>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;