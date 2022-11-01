import { useForm } from '@mantine/form';
import { TextInput, Button, Group, Code } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { useState } from 'react';
import { User } from '@prisma/client'

async function saveUserData(user: User) {
    const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        console.log(response);
        throw new Error(response.statusText);
    }

    return await response.json();
}


function Form({ submittedValues, setUsers }: {submittedValues: User[], setUsers: any}) {

  const [submittedNow, setSubmittedNow] = useState("");
  const form = useForm({
    initialValues: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      avatar: '',
    },
  });

  return (
    <div style={{ maxWidth: 320, margin: 'auto' }}>
        <form
            onSubmit={form.onSubmit(async (values: User, e: any) => {
                    try {
                      //await saveUser(values);
                      await saveUserData(values);
                      setUsers([...submittedValues, values]);
                      setSubmittedNow(JSON.stringify(values, null, 2));
                      
                      e.target.reset();
                    } catch (err) {
                      console.log(err);
                    }
                  })
            }
        >
      <TextInput label="Name" placeholder="Name" {...form.getInputProps('firstName')} />
      <TextInput mt="md" label="lastName" placeholder="Last Name" {...form.getInputProps('lastName')} />
      <TextInput mt="md" label="email" placeholder="yeeter@yeet.com" {...form.getInputProps('email')} />
      <TextInput mt="md" label="avatar" placeholder="link" {...form.getInputProps('avatar')} />

      <Group position="center" mt="xl">
        <Button
          variant="outline"
          onClick={() =>
            form.setValues({
              id: randomId(),
              firstName: randomId(),
              lastName: randomId(),
              email: `${randomId()}@test.com`,
              avatar: 'https://www.github.com/OopsOverflow.png'
                
            })
          }
        >
          Set random values
        </Button>
        <Button
            variant={"gradient"}
            type={"submit"}
        >
        Submit
        </Button>
      </Group>
      </form>
      {submittedNow && <Code block mt={12}>{submittedNow}</Code>}
    </div>
  );
}

export default Form;