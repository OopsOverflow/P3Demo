import { BackgroundImage, Card, Center, Container, Grid, Text, Title } from "@mantine/core";
import { NextComponentType } from "next";
import Image from "next/image";
import React from "react";
import { User } from "@prisma/client";

function UserComp ({ firstName, lastName, email, avatar }: User){
    return(
        <Card shadow={"lg"} radius="md" sx={{ minWidth: 400 }} style={{ padding: 0 }} withBorder>
          <BackgroundImage
            src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
            p={10}
            >
            <Grid style={{ width: '100%', height: '100%' }} justify="center" align={"center"} gutter={"xl"}>
                <Grid.Col span={"content"} >
                    <Image
                        width={70}
                        height={70}
                        src={avatar}
                        alt="avatar"
                        style={{
                            borderRadius: 90,
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={8} pl={20}>
                    <Title order={3}>{firstName}</Title>
                    <Title order={6}>{lastName}</Title>
                    <Title order={6}>{email}</Title>
                </Grid.Col>
            </Grid>
        </BackgroundImage>
      </Card>
    )
}

export default UserComp;