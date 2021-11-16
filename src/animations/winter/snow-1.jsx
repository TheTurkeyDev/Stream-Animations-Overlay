
/* 
   customizable snowflake styling
   https://pajasevi.github.io/CSSnowflakes/
 */

import { Snowflake } from '../../components/snowflake';


export const Snow1 = () => (
    <>
        <Snowflake character='❅' left='1%' delay1={0} delay2={0} />
        <Snowflake character='❆' left='10%' delay1={1} delay2={1} />
        <Snowflake character='❅' left='20%' delay1={6} delay2={.5} />
        <Snowflake character='❆' left='30%' delay1={4} delay2={2} />
        <Snowflake character='❅' left='40%' delay1={2} delay2={2} />
        <Snowflake character='❆' left='50%' delay1={8} delay2={3} />
        <Snowflake character='❅' left='60%' delay1={6} delay2={2} />
        <Snowflake character='❆' left='70%' delay1={2.5} delay2={1} />
        <Snowflake character='❅' left='60%' delay1={6} delay2={2} />
        <Snowflake character='❆' left='70%' delay1={2.5} delay2={1} />
        <Snowflake character='❅' left='80%' delay1={1} delay2={0} />
        <Snowflake character='❆' left='90%' delay1={3} delay2={1.5} />
        <Snowflake character='❅' left='25%' delay1={2} delay2={0} />
        <Snowflake character='❆' left='65%' delay1={4} delay2={2.5} />
    </>
);