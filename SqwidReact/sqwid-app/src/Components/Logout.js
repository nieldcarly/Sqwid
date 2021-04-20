import React, { useEffect, useState } from 'react';
import {Home} from './Home';

export default function Logout() {
    sessionStorage.removeItem('token')

    return (
        <Home></Home>
    )
}