import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Endpoint for identity reconciliation
app.post('/identify', async (req, res) => {
  const { email, phoneNumber } = req.body;

  // Step 1: Search for existing contacts
  const contacts = await prisma.contact.findMany({
    where: {
      OR: [
        { email: email || undefined },
        { phoneNumber: phoneNumber || undefined },
      ],
    },
  });

  let primaryContact:any;
  let secondaryContactIds: number[] = [];
  let emails: string[] = [];
  let phoneNumbers: string[] = [];

  if (contacts.length > 0) {
    // If there are matching contacts, find the primary one
    primaryContact = contacts.find(contact => contact.linkPrecedence === 'primary');
    secondaryContactIds = contacts
      .filter(contact => contact.id !== primaryContact?.id)
      .map(contact => contact.id);

    emails = Array.from(new Set(contacts.map(contact => contact.email!).filter(Boolean)));
    phoneNumbers = Array.from(new Set(contacts.map(contact => contact.phoneNumber!).filter(Boolean)));
  } else {
    // Create a new primary contact if no existing contacts are found
    primaryContact = await prisma.contact.create({
      data: {
        email,
        phoneNumber,
        linkPrecedence: 'primary',
      },
    });
  }

  // Consolidate response data
  const response = {
    contact: {
      primaryContactId: primaryContact?.id,
      emails: emails.length ? emails : [primaryContact?.email],
      phoneNumbers: phoneNumbers.length ? phoneNumbers : [primaryContact?.phoneNumber],
      secondaryContactIds: secondaryContactIds,
    },
  };

  res.status(200).json(response);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
