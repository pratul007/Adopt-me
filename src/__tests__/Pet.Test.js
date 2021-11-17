import { expect, test } from '@jest/globals'
import { render } from '@testing-library/react'
import { StaticRouter } from 'react-router';
import Pet from '../Pet'

test("display a default thumnail", async ()=>{
    const pet = render(
    <StaticRouter>
        <Pet />
    </StaticRouter>
);
    const petThumnail = await pet.findByTestId("thumnail");
    expect(petThumnail.src).toContain("none.jpg");
} );