# What is a Neural Network?

## Metadata


---

*Extracted on: 11/30/2025, 9:05:13 PM*

*Extraction method: ADE PDF Parse & Extract*


---

## Document Content

<a id='314413f5-dcf2-4165-8d06-f8ee78e1b169'></a>

<::An abstract illustration of a neural network or nerve cells, featuring glowing orange, interconnected lines and nodes on a dark background.: figure::>What is a Neural Network? 

<a id='d7adc261-ef9a-42f4-940b-0111f7ec04cf'></a>

What is an *artificial*
neural network?

<a id='3856a8b4-df81-422c-9047-2b4305e07f9d'></a>

- Machine learning framework

<a id='5f842240-b706-4e73-be47-5d48732328ee'></a>

Mimics the learning pattern of the

<a id='81ce0947-c54d-48cc-9df0-5b48ffe7b502'></a>

brain's neural networks

<a id='a7d90c51-82e2-4d21-9491-09a1f2511693'></a>

What is a *natural* neural network?

<a id='77002424-0efa-442e-b322-e055aba47dc2'></a>

<::A diagram of a neuron is shown. From left to right, it features a cell body (soma) with a central gray oval representing the nucleus. Numerous dendrites extend outwards from the cell body. A long axon extends from the cell body, encased by several oval-shaped myelin sheaths, with small gaps (indicated by double equals signs) between them representing nodes of Ranvier. At the far right, the axon branches into several axon terminals, which are enclosed within a lightly shaded oval area.: figure::>

<a id='2da37764-b221-477f-9aa2-05f86954f034'></a>

What is a _natural_ neural network?

<a id='c1dda9f6-f0f7-4fb0-b88f-f84a29cd2f28'></a>

*   Interconnected neurons that receive

<a id='463d679f-e462-4b8c-bea1-3a6e09e7512f'></a>

inputs

* Produce output signal through an axon to

<a id='fada16b4-6019-4756-978c-a432ffd8caac'></a>

another neuron

<a id='f9ce4814-ed89-4b6e-96a5-91efca56729c'></a>

How do you *build* a neural network?

<a id='2403d9a9-a71c-4d50-80e3-1470cc228bc1'></a>

- Input layer takes in feature inputs
- Add hidden layers

<a id='676aa5b3-9e7b-4293-9e32-b6bfab5d29c1'></a>

* Output layer makes outputs

<a id='66636433-3db5-4a2f-96b9-b2ab2503c0e4'></a>

<::A neural network diagram titled "Layers". The diagram consists of four vertical layers with white circular nodes and dark gray arrows indicating connections between nodes.

From left to right:
- The first layer, labeled "Input" on a yellow background, contains one node.
- The second layer, labeled "hidden" on a red background, contains three nodes. Each node from the input layer connects to all three nodes in this hidden layer.
- The third layer, also labeled "hidden" on a red background, contains three nodes. Each node from the first hidden layer connects to all three nodes in this second hidden layer.
- The fourth layer, labeled "output" on a green background, contains one node. Each node from the second hidden layer connects to the single node in the output layer.
: neural network diagram::>

<a id='350ab9f1-a04a-4dcf-ba90-64da3c5df90a'></a>

<::A diagram of a neuron. The central part, the soma or cell body, is yellow and star-shaped with a purple nucleus in the center. Branching out from the soma are several dendrites, depicted in orange, which further branch into smaller filaments, each ending in a light blue, oval-shaped terminal. Extending from one side of the soma is a long, light blue axon, which also has a small purple oval structure within it, likely representing a myelin sheath or another internal component.::>

<a id='b7d11cb8-9cf3-4b07-97f1-36b949aea40a'></a>

What is a neuron?

<a id='64f83c5a-4cc3-4a83-a740-fd47808c421f'></a>

* Calculates weighted sum of inputs

<a id='d888e78f-387f-4979-915a-6ab8b5673024'></a>

from predecessor neuron

<a id='de43ab3d-368d-4dc7-9e30-808a388086a8'></a>

- Applies an activation function to

<a id='871a0b85-f11e-42a7-8f7f-00ed6afb6244'></a>

produce its output

<a id='c5f25104-4920-4768-97d3-757bebb71c64'></a>

How do you _build_ the layers?

<a id='73f81dc8-d5b6-46a5-9c79-125fb9e24b2e'></a>

- Start with 1 *perceptron*

<a id='30fb079a-87c6-4f6b-9484-88e69f8d1edd'></a>

Add layers of perceptrons

<a id='7ce3d78e-93f6-4bd8-93dc-1afdb5ed380f'></a>

together

<a id='63f1f349-35c4-4617-b808-6df245ba8368'></a>

What is a perceptron?

<a id='fd8cb9b7-099f-4c82-a7f4-ef17564081a9'></a>

1. Receives inputs
2. Multiplies inputs by a random weight
3. Adds a bias to account for inputs of o
4. Passes inputs to an activation function to

<a id='d34ce82b-e6a6-4068-b21f-3c58c02abbfe'></a>

produce an output

<a id='192f8486-46dd-4366-a860-a85e37dae70e'></a>

What do you do with the
output?

<a id='241fdc72-eecc-40fd-bb46-ba9e6463c824'></a>

1. Compare the output to a known label
2. Adjust weight accordingly
3. Repeat until there are no more allowed
iterations or the error rate is acceptable

<a id='4bad1147-b4ce-44a3-9d13-e1d51f567830'></a>

How do you build a perceptron?

<a id='5360dc67-071a-489f-85ba-66da0d46fba8'></a>

At least 1 input

<a id='8031b7b4-c61b-45be-8ed3-45df33fdd7a3'></a>

Bias
Activation function

<a id='51f62642-4cd4-4299-9a4f-7895c435b3c7'></a>

1 output

<a id='d756773f-e535-4240-93ac-212017465549'></a>

Types of neural networks

<a id='cf267ec5-726e-4e27-b38a-eb146fc3b71d'></a>

*   **Feedforward (NN)**
    *   Connections only in 1 direction

<a id='b2c7c14f-c4ef-4cc1-a7dc-68faacd1d642'></a>

Types of neural
networks

<a id='0100c217-d25b-420b-b537-1c607d54adfd'></a>

<::logo: [Unknown]7The image displays a dark blue pixelated number '7' against a light blue background.::>

<a id='556b1162-555d-4f06-870c-eb60e438206a'></a>

* Convolutional (CNN)
    * Takes adjacency into account
    * Grid topology data (images)

<a id='a55c9f6e-1a45-424e-97c8-17fff5acc22d'></a>

Types of neural networks

<a id='751f1d20-e846-4fb2-abb0-a8d5b8cdf82b'></a>

*   **Recurrent (RNN)**
    *   Feeds outputs back into its own inputs
    *   Sequential data (language)

<a id='0e9599d6-9658-4924-be82-4efa4ea02f14'></a>

<::A figure containing three plots. From left to right: Plot 1: tanh() activation function. The x-axis is labeled 'X' and ranges from -3 to 3. The y-axis is labeled 'Y' and ranges from -1.00 to 1.00. A blue line with circular markers shows a sigmoid curve, starting near Y=-1.00 for X=-3, passing through Y=0.00 at X=0, and approaching Y=1.00 for X=3. Plot 2: Relu activation function. The x-axis is labeled 'X' and ranges from -3 to 3. The y-axis is labeled 'Y' and ranges from 0.0 to 3.0. An orange line with circular markers shows the function is 0 for X <= 0, and increases linearly with a slope of 1 for X > 0. Plot 3: Leaky Relu activation function. The x-axis is labeled 'X' and ranges from -3 to 3. The y-axis is labeled 'Y' and ranges from -0.5 to 3.0. A green line with circular markers shows the function increases linearly with a small positive slope for X <= 0 (e.g., Y is approximately -0.3 at X=-3) and increases linearly with a slope of 1 for X > 0. The function passes through (0,0).
: chart::>

<a id='05209db5-5c27-4f65-81a3-dff46002f09a'></a>

# Activation Function

*   **Nonlinear function**
    *   Allows large networks of neurons to repres
        functions

<a id='09c24aec-8e21-4dc7-8df8-e3ace69c42e8'></a>

sent arbitrary

<a id='c1658c03-49a2-464a-85bb-106a97fb68b9'></a>

<::An image depicting glowing orange, interconnected lines resembling a neural network on a dark background. A diagonal white section overlays the bottom right, containing the text "What is a Neural Network? ✓": figure::>


<a id='ebde07cb-b110-4720-bdf9-db1c08e2c71f'></a>

What is a Neural
Network? ✓