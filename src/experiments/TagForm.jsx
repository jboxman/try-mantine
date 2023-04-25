import {
  TextInput,
  Button,
  Group,
  Box,
  Select,
  ScrollArea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useEffect } from 'react';
//import { forwardRef } from 'react';

const TagForm = (props = {}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      setData(
        await import('./tags-flat.json').then((module) => module.default)
      );
    })();
  }, []);

  const form = useForm({
    initialValues: {
      tagName: '',
      parentId: '',
    },
  });

  const AutoCompleteItem = ({ value, ...others }, ref) => {
    return (
      <div ref={ref} {...others}>
        <Text size="xs" color="dimmed">
          {description}
        </Text>
      </div>
    );
  };

  return (
    <Box maw={300} mx="auto">
      <form>
        <Group>
          <TextInput
            label="Tag"
            withAsterisk
            {...form.getInputProps('tagName')}
          />
          <Select
            label="Parent"
            withAsterisk
            searchable
            clearable
            data={data}
            maxDropdownHeight={100}
            {...form.getInputProps('parentId')}
          />
        </Group>

        <Group
          sx={{
            padding: '1rem 0 0 0',
          }}
        >
          <Button>Create</Button>
          <Button>Cancel</Button>
        </Group>
      </form>
    </Box>
  );
};

export default TagForm;
