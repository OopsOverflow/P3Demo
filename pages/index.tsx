import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { AppShell, Center, Grid, Header, Stack, Title } from '@mantine/core';
import Form from '../components/Form';
import UserComp from '../components/User';
import prisma from '../lib/prisma';
import { User } from "@prisma/client";


const Home = ({ initialUsers }: {initialUsers: User[]}) => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  return (
    <AppShell
      padding="md"
      header={<Header height={60} p="xs"><Title order={1}>Contacts</Title></Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Center style={{ minWidth:'70vw', width: '100%', height: '100%' }}>
      <Grid pt={12} style={{ width: '100%', height: '100%' }}>
        <Grid.Col span={4}>
          <Stack justify={"center"} align={"center"} style={{ width: '100%', height: '100%' }}>
            <Form submittedValues={users} setUsers={setUsers}/>
          </Stack>
        </Grid.Col>
          <Grid.Col span={8} style={{ width: '100%', height: '100%' }}>
          <Stack align={"center"} justify={"center"} style={{ width: '100%', height: '100%' }}>
            {users?.map((user, index) => 
              <UserComp id={user.id} firstName={user.firstName} lastName={1} avatar={user.avatar} email={user.email} key={index+'avc'} />
            )}
          </Stack>
        </Grid.Col>
      </Grid>
      </Center>
    </AppShell>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma.user.findMany();

  return {
    props: {
      initialUsers: data
    }
  };
}

export default Home;