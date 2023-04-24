import { TextInput, Button, Group, Box, Autocomplete, ScrollArea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useEffect } from 'react';
import { forwardRef } from "react";

const TagForm = (props = {}) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    (async function() {
      setData(await import('./tags-flat.json').then(
        (module) => module.default
      ));
    })();
  }, [])

  const form = useForm({
    initialValues: {
      tagName: ''
    }
  });

  const AutoCompleteItem = ({ value, ...others }, ref) => {
    return (
    <div ref={ref} {...others}>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
    </div>)
  }

  return (
    <Box maw={300} mx="auto">
    <form>
      <Group>
        <TextInput label="Tag" withAsterisk {...form.getInputProps('tagName')} />
        <Autocomplete label="Parent" dropdownComponent={forwardRef((props, ref) => (
            <ScrollArea viewportRef={ref} {...props} />
          ))}
          withAsterisk data={data} limit={15} maxDropdownHeight='3rem' />
      </Group>

      <Group sx={{
        padding: '1rem 0 0 0'
      }}>
        <Button>
          Create
        </Button>
        <Button>
          Cancel
        </Button>
      </Group>
    </form>
    </Box>
  );
};
export default TagForm;
